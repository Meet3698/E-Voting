class AuthenticationService {
    setSession(voter_name, voter_id) {
        sessionStorage.setItem("voter_name", voter_name)
        sessionStorage.setItem("voter_id", voter_id)
    }

    removeSession() {
        sessionStorage.removeItem("voter_name")
        sessionStorage.removeItem("voter_id")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("password")
    }

    isUserLoggedIn() {
        let voter_name = sessionStorage.getItem("voter_name")
        let voter_id = sessionStorage.getItem("voter_id")

        if (voter_name != null && voter_id != null) {
            return true
        }
        else {
            return false
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