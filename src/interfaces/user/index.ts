export interface IUser {
    id:           string
    name:         string
    email:        string
    phone_number: string
}

export interface IUserCreateRequest {
    name:         string
    email:        string
    phone_number: string
}

export interface IUserCreateResponse {
    id:           string
    name:         string
    email:        string
    phone_number: string
    created_at:   Date
}

export interface IUserRequestUpdate {
    name:         string
    email:        string
    phone_number: string
}

export interface IUserResponseUpdate {
    id:           string
    name:         string
    email:        string
    phone_number: string
    updated_at:   Date
}
