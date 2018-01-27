import {store} from '../store/store'

export default(to,from,next) =>{
    if(store.getters.getUserState)
    {
    next()
    }
    else next('/login')
}