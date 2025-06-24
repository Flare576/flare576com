---
title: "Blocks"
date: Mon Jun 23 20:18:09 CDT 2025
published: true
description: "Alt, Opt, Loop, and Par"
goal: N/A
solution: N/A
tags: ["programming","vscode","uml","plantuml","sequence_diagram","blocks"]
---
(Check out [PlantUML Introduction](#/programming/uml/introduction) if you're new!

# Groups

If you just want generic groupings, check out [Boxes and Groups](#programming/uml/boxes-and-groups), but if you want _specific_ control blocks, you'll want to look at `alt`, `opt`, `loop` and `par`.

# Alt

An "Alternate" flow - this block can be used to illustrate error paths, alternate conditions, or other non-linear effects of a sequence diagram.

```plantuml
@startuml My Example

box "Our App" #dffcc2
    participant "API" as api
end box
box "Third Party" #cccccc
    participant "User Data" as data
end box

group Authorization of API (Pre-Condition)
  api -> data: **POST /oauth2/token**

  alt Success
    data -> api: B2B-JWT
  else Token request fails
    data -> api: Error response
    api -> api: Alert Process
  end
end

@enduml
```

![PlantUML Blocks](/images/thumbnail/plantuml_block1.png)

# Opt

An "Optional" flow - similar to `alt`, but intended for extraneous processes more than error conditions.

```plantuml
@startuml My Example

box "Our App" #dffcc2
    participant "Portal" as portal
    participant "API" as api
    database "DynamoDB" as db
end box
box "Third Party" #cccccc
    participant "User Data" as data
end box

group Get User Data
  portal -> api: Get Data
  api -> db: Get User Data
  opt Data Not Found
    db -> api: Not Found
    api -> data: Get User Data
    data -> api: User Data
    api -> db: Store User Data
  end
  api -> portal: User Data
end

@enduml
```

![PlantUML Blocks](/images/thumbnail/plantuml_block2.png)

# Loop

Basically, what it says on the tin - Use this to describe a logic loop.

```plantuml
@startuml My Example

box "Our App" #dffcc2
    participant "Portal" as portal
    participant "API" as api
    database "DynamoDB" as db
end box
box "Third Party" #cccccc
    participant "User Data" as data
end box

group Get Users Data
  portal -> api: Get Users Data
  loop ForEach User
    api -> db: Get User Data
    opt Data Not Found
        db -> api: Not Found
        api -> data: Get User Data
        data -> api: User Data
        api -> db: Store User Data
    end
    api -> api: Add to List
  end
  api -> portal: Users Data
end

@enduml
```

![PlantUML Blocks](/images/thumbnail/plantuml_block3.png)

# Par

When you need to show "Parallel" calls. You'd use the same syntax as the `loop` above, and The diagram doesn't actually change at all.

## Bonus

If you need to show explicit parallel calls, you'll need to invoke the **`teoz`** architecture.

```plantuml
@startuml My Example
!pragma teoz true

box "Our App" #dffcc2
    participant "Portal" as portal
    participant "API" as api
end box
box "Third Party" #cccccc
    participant "User Data" as data
end box

group Get User Data
  portal -> api: Get User Data
  & api -> data: Keep cache updated
  api -> portal: User Data
end

@enduml
```

![PlantUML Blocks](/images/thumbnail/plantuml_block4.png)
