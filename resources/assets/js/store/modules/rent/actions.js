export const getRentTable = ({
    commit
  }, {
    type
  }) => axios
  .get('/api/v1/admin/rents/' + type + '/type')
  .then((response) => {
    if (type == 1) {
      commit('setRentM', response.data.data)
    } else if (type === 2) {
      commit('setRentQ', response.data.data)
    }
  })
