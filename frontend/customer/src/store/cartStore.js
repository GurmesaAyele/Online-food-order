import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      
      addItem: (item, restaurantId) => {
        const { items, restaurantId: currentRestaurantId } = get()
        
        // Clear cart if different restaurant
        if (currentRestaurantId && currentRestaurantId !== restaurantId) {
          set({ items: [item], restaurantId })
          return
        }
        
        const existingItem = items.find(i => i.id === item.id)
        if (existingItem) {
          set({
            items: items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }], restaurantId })
        }
      },
      
      removeItem: (itemId) => {
        set({ items: get().items.filter(i => i.id !== itemId) })
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
        } else {
          set({
            items: get().items.map(i =>
              i.id === itemId ? { ...i, quantity } : i
            )
          })
        }
      },
      
      clearCart: () => set({ items: [], restaurantId: null }),
      
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
