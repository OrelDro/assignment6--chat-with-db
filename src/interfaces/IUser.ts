interface IUser {
    id?: string,
    UserName: string,
    Password?: string,
    age?: number,
    messages?: object[]
}

export default IUser;