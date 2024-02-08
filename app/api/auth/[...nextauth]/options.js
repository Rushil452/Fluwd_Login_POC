import Credentials from "next-auth/providers/credentials"

export const options = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username", type: "text", placeholder: "your username"
                },
            },
            async authorize(credentials) {
                
            }
        })
    ],
}