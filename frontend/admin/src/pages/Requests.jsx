import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Eye, Store, Bike } from 'lucide-react'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState(null)
  const [password, setPassword] = useState('')
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests/pending')
      setRequests(response.data)
    } catch (error) {
      toast.error('Failed to fetch requests')
    }
  }

  const handleApprove = async () => {
    if (!password) {
      toast.error('Please enter a temporary password')
      return
    }

    try {
      await api.post(`/requests/${selectedRequest.id}/approve`, {
        password,
        admin_notes: adminNotes
      })
      toast.success('Request approved and account created!')
      setShowModal(false)
      setPassword('')
      setAdminNotes('')
      fetchRequests()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to approve request')
    }
  }

  const handleReject = async () => {
    if (!adminNotes) {
      toast.error('Please provide a reason for rejection')
      return
    }

    try {
      await api.post(`/requests/${selectedRequest.id}/reject`, null, {
        params: { admin_notes: adminNotes }
      })
      toast.success('Request rejected')
      setShowModal(false)
      setAdminNotes('')
      fetchRequests()
    } catch (error) {
      toast.error('Failed to reject request')
    }
  }

  const openModal = (request, actionType) => {
    setSelectedRequest(request)
    setAction(actionType)
    setShowModal(true)
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Access Requests</h1>
          <p className="admin-page-subtitle">Review restaurant and rider applications</p>
        </div>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Pending Requests ({requests.length})</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Details</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>#{request.id}</td>
                <td>
                  <span className={`admin-badge ${request.request_type === 'restaurant' ? 'restaurant' : 'rider'}`}>
                    {request.request_type === 'restaurant' ? (
                      <><Store size={14} /> Restaurant</>
                    ) : (
                      <><Bike size={14} /> Rider</>
                    )}
                  </span>
                </td>
                <td>{request.full_name}</td>
                <td>{request.email}</td>
                <td>{request.phone}</td>
                <td>
                  {request.request_type === 'restaurant' ? (
                    <div className="text-sm">
                      <div><strong>{request.restaurant_name}</strong></div>
                      <div className="text-gray-600">{request.cuisine_type}</div>
                    </div>
                  ) : (
                    <div className="text-sm">
                      <div><strong>{request.vehicle_type}</strong></div>
                      <div className="text-gray-600">License: {request.license_number}</div>
                    </div>
                  )}
                </td>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="admin-actions">
                    <button 
                      className="admin-action-btn view"
                      onClick={() => openModal(request, 'view')}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="admin-btn admin-btn-success"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => openModal(request, 'approve')}
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button 
                      className="admin-btn admin-btn-danger"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => openModal(request, 'reject')}
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
              {action === 'view' && 'Request Details'}
              {action === 'approve' && 'Approve Request'}
              {action === 'reject' && 'Reject Request'}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <strong>Type:</strong> {selectedRequest.request_type}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Name:</strong> {selectedRequest.full_name}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Email:</strong> {selectedRequest.email}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Phone:</strong> {selectedRequest.phone}
              </div>

              {selectedRequest.request_type === 'restaurant' && (
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Restaurant Name:</strong> {selectedRequest.restaurant_name}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Address:</strong> {selectedRequest.restaurant_address}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Cuisine:</strong> {selectedRequest.cuisine_type}
                  </div>
                  {selectedRequest.business_license && (
                    <div style={{ marginBottom: '16px' }}>
                      <strong>Business License:</strong> {selectedRequest.business_license}
                    </div>
                  )}
                </>
              )}

              {selectedRequest.request_type === 'rider' && (
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <strong>Vehicle Type:</strong> {selectedRequest.vehicle_type}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong>License Number:</strong> {selectedRequest.license_number}
                  </div>
                  {selectedRequest.government_id && (
                    <div style={{ marginBottom: '16px' }}>
                      <strong>Government ID:</strong> {selectedRequest.government_id}
                    </div>
                  )}
                </>
              )}
            </div>

            {action === 'approve' && (
              <div style={{ marginBottom: '24px' }}>
                <div className="admin-input-group">
                  <label className="admin-input-label">Temporary Password *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter temporary password for new account"
                  />
                </div>
                <div className="admin-input-group">
                  <label className="admin-input-label">Admin Notes (Optional)</label>
                  <textarea
                    className="admin-input"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows="3"
                    placeholder="Add any notes..."
                  />
                </div>
              </div>
            )}

            {action === 'reject' && (
              <div style={{ marginBottom: '24px' }}>
                <div className="admin-input-group">
                  <label className="admin-input-label">Reason for Rejection *</label>
                  <textarea
                    className="admin-input"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows="4"
                    placeholder="Explain why this request is being rejected..."
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowModal(false)
                  setPassword('')
                  setAdminNotes('')
                }}
                className="admin-btn admin-btn-outline"
              >
                {action === 'view' ? 'Close' : 'Cancel'}
              </button>
              {action === 'approve' && (
                <button
                  onClick={handleApprove}
                  className="admin-btn admin-btn-success"
                >
                  <CheckCircle size={18} />
                  Approve & Create Account
                </button>
              )}
              {action === 'reject' && (
                <button
                  onClick={handleReject}
                  className="admin-btn admin-btn-danger"
                >
                  <XCircle size={18} />
                  Reject Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
