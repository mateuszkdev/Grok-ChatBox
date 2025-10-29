"use client"

import { useEffect, useState } from "react"

export default function Users() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const handleButton = (e: React.FormEvent, action: "activate" | "block", _id: string): any => {
    
    e.preventDefault()

    fetch("/api/admin/updateUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action, _id
        })
    })
    .then(res => {
        if (res.status === 200) {
            fetch("/api/admin/getUsers")
                .then(data => data.json())
                .then(json => {
                    setUsers(json.users)
                    setLoading(false)
                })
        }
    })

  }

  useEffect(() => {
    
    fetch("/api/admin/getUsers")
        .then(data => data.json())
        .then(json => {
            setUsers(json.users)
            setLoading(false)
        })

  }, [])
  if (loading) return <> Ladowanie danych </>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user: { _id: string, name: string, email: string, active: boolean }) => (
             <tr key={user.name}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">

                {user.active ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                    </span>
                ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Blocked
                    </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {user.active ? (
                    <button
                     onClick={(e) => handleButton(e, "block", user._id)}
                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                        Block
                    </button>
                ) : (
                   <button
                    onClick={(e) => handleButton(e, "activate", user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                        Activate
                   </button>
                )}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
