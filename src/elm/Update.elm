module Update exposing (update)

import Messages exposing (Message)
import Model exposing (Model)


update : Message -> Model -> Model
update message model =
    model
