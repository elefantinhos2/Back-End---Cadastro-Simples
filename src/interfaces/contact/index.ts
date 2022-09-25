export interface IContact {
    id:           string
    name:         string
    email:        string
    phone_number: string
}

export interface IContactRequest {
    name:         string
    email:        string
    phone_number: string
}

export interface IContactResponse {
    id:           string
    name:         string
    email:        string
    phone_number: string
    created_at:   Date
}

export interface IContactResponseUpdate {
    id:           string
    name:         string
    email:        string
    phone_number: string
    updated_at:   Date
}