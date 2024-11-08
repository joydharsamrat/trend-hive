/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/components/shared/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useMakeAdminMutation,
} from "@/redux/features/admin/userManagement/userManagement.api";
import { TUserAuth } from "@/types";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { data, isLoading } = useGetUsersQuery(undefined);
  const [makeAdmin] = useMakeAdminMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleMakeAdmin = async (id: string) => {
    const loadingToast = toast.loading("loading...");

    try {
      await makeAdmin(id);
      toast.success("Updating successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Updating user failed. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };
  const handleDeleteUser = async (id: string) => {
    const loadingToast = toast.loading("loading...");

    try {
      await deleteUser(id);
      toast.success("Delete successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Delete user failed. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const users = data?.data?.data;
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full overflow-x-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: TUserAuth) => (
              <tr key={user._id}>
                <td className="min-w-60">{user.name}</td>
                <td className="min-w-60">{user.email}</td>
                <td className="min-w-32">{user.role}</td>
                {user.role === "user" && (
                  <td className="min-w-60">
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      make admin
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
