---
title: "Boxes and Groups"
date: Mon Jun 23 17:30:27 CDT 2025
published: true
description: "Suggestions delineating ownership domains"
goal: N/A
solution: N/A
tags: ["programming","vscode","uml","plantuml","sequence_diagram","domains"]
---
(Check out [PlantUML Introduction](#/programming/uml/introduction) if you're new!

# Ours vs. Theirs

When you need to show calls between systems, and part of the goal is explaining that the systems are somehow _separate_, you can use `box`es:

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

user <-> portal: Access URL
user -> portal: Enter Username+\nPassword
portal -> api: POST **/login**
api -> api: Hash Password
api -> db: Lookup User/Password
db -> api: userId
api -> data: **GET /userInfo/{userId}**
data -> api: 200
api -> portal: 200
portal -> user: Welcome!

@enduml
```

![PlantUML Boxes](/images/thumbnail/plantuml_box1.png)

# This vs. That

If, instead, your diagram needs to communicate multiple logically separate flows, you can also use `group`s:

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

group Authorization of API (Pre-Condition)
  api -> data: **POST /oauth2/token**
  data -> api: B2B-JWT
end

user <-> portal: Access URL
group User Login
  user -> portal: Enter Username+\nPassword

  portal -> api: POST **/login**
  api -> api: Hash Password
  api -> db: Lookup User/Password
  db -> api: userId

  api -> data: **GET /userInfo** + B2B-JWT
  data -> api: 200
  api -> portal: 200
  portal -> user: Welcome!
end

@enduml
```

![PlantUML Groups](/images/thumbnail/plantuml_box2.png)

## Bonus

If you want to show that the **`User`** is waiting while the call is occuring, but don't want the visual noise of the `group`, use the `activate` and `deactivate` commands:

> Note: `activate` and `deactivate` come right AFTER the calls that you want their box to start on

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

group Authorization of API (Pre-Condition)
  api -> data: **POST /oauth2/token**
  data -> api: B2B-JWT
end

user <-> portal: Access URL
user -> portal: Enter Username+\nPassword
activate user

portal -> api: POST **/login**
api -> api: Hash Password
api -> db: Lookup User/Password
db -> api: userId

api -> data: **GET /userInfo** + B2B-JWT
data -> api: 200
api -> portal: 200
portal -> user: Welcome!
deactivate user

@enduml
```

![PlantUML Activate](/images/thumbnail/plantuml_box3.png)

