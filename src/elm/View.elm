module View exposing (view)

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Messages exposing (Message)
import Model exposing (Model)


view : Model -> Html Message
view model =
    text "Hello, world!"
