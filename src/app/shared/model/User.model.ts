export interface User 
{
    id:                    number;
    username:              string;
    password?:              string;
    first_name:            string;
    last_name:             string;
    middle_name:           string;
    email:                 string;
    status:                string;
    userRoles:             UserRole[];
    create_time?:           string;
    enabled:               boolean;
    accountNonExpired:     boolean;
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
}

export interface UserRole 
{
    id:          number;
    type:        string;
    description: string;
    authority:   string;
}
