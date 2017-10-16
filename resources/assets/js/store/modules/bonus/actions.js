export const getBonuses = ({
        commit
    }) => axios
    .get('/api/v1/admin/bonus')
    .then((response) => {
        commit('setBonuses', response.data.data)
    })
