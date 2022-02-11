class AuthenticationService {
    setSession(voter_name, voter_id, voted) {
        sessionStorage.setItem("voter_name", voter_name)
        sessionStorage.setItem("voter_id", voter_id)
        sessionStorage.setItem("voted", voted)

    }

    removeSession() {
        sessionStorage.removeItem("voter_name")
        sessionStorage.removeItem("voter_id")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("password")
    }

    setUserVoted(){
        sessionStorage.setItem("voted", true)
    }

    isUserVoted() {
        let voted = sessionStorage.getItem("voted")
        return voted
    }

    isUserLoggedIn() {
        let voter_name = sessionStorage.getItem("voter_name")
        let voter_id = sessionStorage.getItem("voter_id")

        console.log(this.isUserVoted())

        if (voter_name != null && voter_id != null) {
            if(this.isUserVoted() === "false"){
                return 1
            }else{
                return 2
            }
        }
        else {
            return 3
        }
    }

    setAdminSession(username, password) {
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("password", password)
    }

    isAdminLoggedIn() {
        let username = sessionStorage.getItem("username")
        let password = sessionStorage.getItem("password")

        if (username != null && password != null) {
            return true
        } else {
            return false
        }
    }
}

export default new AuthenticationService()