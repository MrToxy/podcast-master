import {store} from '../store/store'

export default(to,from,next) =>{
    if(store.state.user != null)
    {
        next()
    }
    else next('/login')
}