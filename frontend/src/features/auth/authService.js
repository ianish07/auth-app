import axios from 'axios'

const userRegister = async (userData) => {
    const { data } = await axios.post("/api/users/", userData);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  };

const userLogin = async (userData) => {
    const { data } = await axios.post("/api/users/auth", userData)

    if(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    return data
}

const userUpdate = async (userData) => {
    const { data } = await axios.put("/api/users/update", userData)

    if(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    return data
}

const userLogout = async () => {
    await axios.post('/api/users/logout')
    localStorage.removeItem('user')
}

const authService = {
    userLogin,
    userLogout,
    userRegister,
    userUpdate
}

export default authService