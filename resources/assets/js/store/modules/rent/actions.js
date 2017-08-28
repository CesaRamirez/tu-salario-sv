export const getRentTable = ({
        commit
    }, {
        type
    }) => axios
    .get('/api/v1/admin/rents/' + type + '/type')
    .then((response) => {
        commit('setRent', response.data)
    })
