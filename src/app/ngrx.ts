import { createAction, props } from '@ngrx/store'
import { Product } from './shared/model/product.model'

export const addProductToCart = createAction(
    'AddProductToCart',
    props<{product: Product}>()
)

export const removeProductFromCart = createAction(
    'RemoveProductFromCart',
    props<{product: Product}>()
) 


export var INITIAL_STATE = {products: [], error: false}

if(window.localStorage.getItem("state")){
    INITIAL_STATE = JSON.parse(window.localStorage.getItem("state"))
}

export const reducer = (state = INITIAL_STATE, action: any) => {
    let error = false
    switch (action.type){
        case 'AddProductToCart':                               
            if(state.products.find((item) => item.id == action.product.id)){
                let temp_state_products = state.products.map((item) => {
                    if(item.id == action.product.id){                        
                        let product = { 
                            id: item.id,
                            name: item.name,
                            value: item.value,
                            quantity: item.quantity,
                            createdAt: item.createdAt,
                            updateAt: item.updateAt,
                            description: item.description,
                            actual_quantity: item.actual_quantity || 1
                        }                        
                        if(product.actual_quantity >= product.quantity){
                            error = true
                            return product
                        }
                        product.actual_quantity+=1                        
                        return product
                    }
                    return item
                })
                let temp_state = {products:[...temp_state_products], error: error}
                window.localStorage.setItem("state",JSON.stringify(temp_state))
                return temp_state
            }            
            if(action.product.quantity <= 0){
                error = true
                return {products:[...state.products], error: error}
            }            
            let temp_state = {products:[...state.products, action.product], error: error}
            window.localStorage.setItem("state",JSON.stringify(temp_state))
            return temp_state
        case 'RemoveProductFromCart':
            let products = [...state.products] 
            let product = products.find((item) => item.id == action.product.id)
            let index = products.indexOf(product)
            if (index > -1) {
                products.splice(index,1)
            }           
            window.localStorage.setItem("state",JSON.stringify({products:products, error: error}))            
            return {products:products, error: error}
        default:
            return state
    }
}