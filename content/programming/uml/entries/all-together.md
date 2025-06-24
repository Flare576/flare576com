---
title: "All Together"
date: Mon Jun 23 22:17:35 CDT 2025
published: true
description: "Putting all the pieces together"
goal: N/A
solution: N/A
tags: ["programming","vscode","uml","plantuml","sequence_diagram","complete"]
---
(Check out [PlantUML Introduction](#/programming/uml/introduction) if you're new!

# High Data Density

This is an example of what you can produce when the diagram is the ONLY thing you can give a person/group interested in knowing how things work together.

```plantuml
@startuml My Example

actor "User" as user
box "Our App" #dffcc2
    participant "Portal" as portal
    participant "API" as api
    database "DynamoDB" as db
end box
box "Third Party" #cccccc
    participant "User Data" as data
end box

autonumber 1.1
group Authorization of API (Pre-Condition)
  api -> data: **POST /oauth2/token**
  note over api, data #F0F0F0
    = Request Details

    **Headers:**
      Authorization: Basic(ClientId:Secret)
    **Body:**
      grant_type=client_credentials
  end note
  alt Token request fails
    data -> api: Error response
    api -> api: Alert Process
  end
  data -> api: B2B-JWT
end

autonumber inc A
user <-> portal: Access URL
group User Login
  user -> portal: Enter Username+\nPassword
  activate user
  
  portal -> api: POST **/login**
  note over portal, api #F0F0F0
    = Request Details

    **Headers:**
      Accept: application/json
      Content-Type: application/json
    **Body:**
      **Required Field**
        username:  String
        password: String
      **Optional Field**
        includeFullName: Boolean
  end note

  api -> api: Hash Password
  api -> db: Lookup User+\nPassword
  db -> api: userId

  api -> data: **GET /userInfo**
  note over api, data #F0F0F0
    = Request Details

    **Headers:**
      Accept: application/json
      Authorization: B2B JWT Token
    **Path:**
      **Required Field**
        userId:  String
        password: String
    **Query:**
      **Optional Field**
        firstName: Boolean
        lastName: Boolean
        fullName: Boolean
  end note

  data -> api: [200 - OK]
  note over api, data #d3f5f6
    = Response Details

    **Headers:**
      Content-Type: application/json
    **Body:**
      **Optional Field**
        firstName:  String
        lastName: String
        fullName: String
  end note

  api -> portal: [200 - OK]
  note over portal, api #d3f5f6
    = Response Details

    **Headers:**
      Content-Type: application/json
    **Body:**
      **Required Field**
        firstName:  String
        lastName: String
      **Optional Field**
        fullName: String
  end note

  portal -> user: Welcome!
  deactivate user
end

@enduml
```

![PlantUML Complete Diagram](/images/thumbnail/plantuml_complete1.png "huge")

## "Can" Vs. "Should"

I don't actually recommend this - it's _too much_ in one shot. No one is going to benefit from this much information on one diagram, probably not even you since you'll be maintaining this monster.

The `Request` and `Response` information is great if you're showing ONE API call, but I'd argue it's even BETTER in an [OpenAPI](https://www.openapis.org/) spec and **referenced** by the documentation that accompanies your diagram (I highly recommend utilizing [PlantUML Auto-Numbering](#programming/uml/numbering) to tie docs to diagram).

The **Authorization of API (Pre-Condition)** section could be moved to a separate diagram - it's _probably_ a common flow that any API hitting the external **`Third Party`** service will also need to reference.
