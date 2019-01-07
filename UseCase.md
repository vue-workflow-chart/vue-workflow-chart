# Use Case Visualisierung eines Workflows

## Beschreibung
Es gibt komplexe Workflows mit Status, Transitionen. Diese können schnell komplex werden, wo eine
interaktive Visualisierung die Arbeit erleichtern soll.

## Ablauf
* Workflow ist erstellt (als json vorhanden)
* es werden alle Status mit den Transitionen dargestellt und beschriftet
* durch einen Klick auf Status oder Transition können diese bearbeitet werden

## Json Struktur
```json
{
  "workflow": {
    "states": {
      "static_state_new": {
        "name": "Neu",
          "isStatic": true,
          "transitions": [
          "Tpyly6p"
          ],
          "onlyVisibleTo": []
      },
      "static_state_deleted": {
        "name": "Gelöscht",
          "isStatic": true,
          "transitions": [
          "Kj7tqn"
          ],
          "onlyVisibleTo": [
          {
            "type": "group",
              "value": "NobodyGroup"
          }
          ]
      },
      "Hvfw2ds": {
        "name": "Freigegeben",
          "transitions": [
          "Hj56kfc"
          ],
          "onlyVisibleTo": []
      }
    },
    "transitions": {
      "Kj7tqn": {
        "workflowState": "static_state_deleted",
          "name": "wiederherstellen",
          "targetState": "static_state_new",
          "allowedUsers": [
          {
            "type": "workflowAppAdmins"
          }
          ],
            "usersToNotify": [],
            "deleteComments": false,
            "transitionHint": ""
      },
      "Hj56kfc": {
        "workflowState": "Hvfw2ds",
          "name": "löschen",
          "targetState": "static_state_deleted",
          "allowedUsers": [],
          "usersToNotify": [],
          "deleteComments": false,
          "transitionHint": ""
      },
      "Tpyly6p": {
        "workflowState": "static_state_new",
          "name": "freigeben",
          "targetState": "Hvfw2ds",
          "allowedUsers": [],
          "usersToNotify": [],
          "deleteComments": false,
          "transitionHint": ""
      }
    },
    "statesList": [
      "static_state_new",
      "Hvfw2ds",
      "static_state_deleted"
    ]
  }
```
