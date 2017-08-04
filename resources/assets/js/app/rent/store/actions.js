export const getProducts = ({
        commit
    }, {
        type
    }) => axios
    .get('/api/v1/admin/rents/' + type)
    .then((response) => {
        commit('setRent', response.data)
    })
