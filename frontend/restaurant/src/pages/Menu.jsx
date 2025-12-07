import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import api from '../api/axios'

export default function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    is_available: true
  })
  
  useEffect(() => {
    fetchMenu()
  }, [])
  
  const fetchMenu = async () => {
    try {
      const { data } = await api.get('/restaurants/1/menu')
      setMenuItems(data)
    } catch (error) {
      toast.error('Failed to load menu')
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/restaurants/1/menu', formData)
      toast.success('Menu item added')
      setShowForm(false)
      fetchMenu()
      setFormData({ name: '', description: '', price: '', category: '', is_available: true })
    } catch (error) {
      toast.error('Failed to add item')
    }
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>
      
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Item Name"
              className="input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              className="input"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              className="input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="input md:col-span-2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit" className="btn-primary md:col-span-2">Add Item</button>
          </form>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="card p-4">
            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="text-primary font-bold text-xl mb-4">${item.price}</p>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:text-blue-700">
                <Edit className="w-5 h-5" />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
