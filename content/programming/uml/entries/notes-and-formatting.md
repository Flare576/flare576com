---
title: "Notes and Formatting"
date: Mon Jun 23 16:59:49 CDT 2025
published: true
description: "Suggestions for adding details to diagrams"
goal: N/A
solution: N/A
tags: ["programming","vscode","uml","plantuml","sequence_diagram","note"]
---
(Check out [PlantUML Introduction](#/programming/uml/introduction) if you're new!

# Noted

Sometimes you want to communicate more than just _which_ systems interact, but also _how_ they interact. For that, I like using notes:

```plantuml
@startuml My Example

actor "User" as user
participant "Portal" as portal
participant "API" as api
database "DynamoDB" as db

user <-> portal: Access URL
user -> portal: Enter Username+\nPassword

portal -> api: POST **/login**
note over portal,api
{
  username: string,
  password: string
}
end note
api -> api: Hash Password
api <-> db: Lookup User/Password

api -> portal: OK
note over portal, api
{
    firstName: string,
    lastName: string
}
end note
portal -> user: Welcome!

@enduml
```

![PlantUML Basic Note](/images/thumbnail/plantuml_note1.png)

## Kick It Up a Notch

But, what if you want to take your docs to the **_next level_**? Try this out:

```plantuml
@startuml My Example

actor "User" as user
participant "Portal" as portal
participant "API" as api
database "DynamoDB" as db

user <-> portal: Access URL
user -> portal: Enter Username+\nPassword

portal -> api: POST **/login**
note over portal, api #f0f0f0
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
api <-> db: Lookup User/Password

api -> portal: 200
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

@enduml
```

![PlantUML Basic Note](/images/thumbnail/plantuml_note2.png)

Now your documents are descriptive AND delightful to look at.

> For more formatting, check out [Creole markup](https://en.wikipedia.org/wiki/Creole_(markup))
