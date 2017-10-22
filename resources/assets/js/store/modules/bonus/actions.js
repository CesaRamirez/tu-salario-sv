export const getBonuses = ({
        commit
    }) => axios
    .get('/api/v1/admin/bonus')
    .then((response) => {
        commit('setBonuses', response.data.data)
    })

export const getBonus = ({
        commit
    }, {
        id
    }) => axios
    .get('/api/v1/admin/bonus/' + id)
    .then((response) => {
      commit('setBonus', response.data.data)
    })

export const updateBonus = ({
        id,
        payload
    }) => axios
    .put('/api/v1/admin/bonus' + id, payload)
    .then((response) => {
      commit('setBonus', response.data.data)
    })
