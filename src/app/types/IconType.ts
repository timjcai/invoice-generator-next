export type IconType = | PlatformTypes | ActionTypes | NavigationTypes

export type PlatformTypes =
    | "Facebook"
    | "Linkedin"
    | "Twitter"
    | "Pinterest"
    | "Reddit"
    | "Tumblr"
    | "YouTube"
    | "TikTok"
    | "Google"
    | "Apple"
    | "Github"
    | "Instagram"

export type ActionTypes = 
    | "exit"
    | "delete"
    | "edit"
    | "share"
    | "light"
    | "dark"
    | "add"

export type NavigationTypes = 
    | "home" 
    | "dashboard"
    | "settings" 
    | "contacts"
    | "workspaces"
    | "notification"
    | "invite"
    | "apps"
    | "search"
    | "help"
    | "profile"
    | "schedule"
    | "menu"