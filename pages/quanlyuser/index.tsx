import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Button, Table, TextInput } from "flowbite-react";

import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function Index() {
  const [users, setUsers] = useState([] as any);
  const [userById, setUserById] = useState([] as any);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUsername, setNewusername] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserPassword, setNewuserPassword] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserUsername, setEditUserUsername] = useState("");
  const [editUserImage, setEditUserImage] = useState("");
  const [editUserRole, setEditUserRole] = useState('');
  const [page, setPage] = useState(1);


  useEffect(() => {
    try {
      axios.get("http://localhost:3006/users?page=1").then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [users]);

  const loadMoredata = () => {
    try {
      axios
        .get(`http://localhost:3006/users?page=${page}`)
        .then((response) => {
            setUsers([...users,...response.data]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-6">
      <h1 className="mb-6 font-bold uppercase text-xl text-center">User management</h1>
      <div className="flex justify-start">
        <Button
          className="mb-6"
          onClick={() => {
            setNewUserModal(!newUserModal);
          }}
        >
          Add new User
        </Button>
      </div>
      <div className="mx-auto">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users
              ? users.map((user: any) => {
                  return (
                    <Table.Row
                      key={user.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.email}
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.image}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <a
                          className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setEditModal(!editModal);
                            try {
                              axios
                                .get(`http://localhost:3006/users/${user.id}`)
                                .then((res) => {
                                  setUserById(res.data);
                                });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          Edit
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </div>

      <Button
        className="w-fit self-center"
        onClick={() => {
          setPage(page + 1);
          loadMoredata();
        }}
      >
        Load more
      </Button>

      <div className="mx-auto w-full">
        <Transition appear show={editModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setEditModal(false)}
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit User
                    </Dialog.Title>

                    <Table hoverable={true}>
                      <Table.Head>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>
                          <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {userById.email}
                          </Table.Cell>
                          <Table.Cell>{userById.username}</Table.Cell>
                          <Table.Cell>{userById.image}</Table.Cell>
                          <Table.Cell>{userById.role}</Table.Cell>
                          <Table.Cell>
                            <div>
                              <a
                                className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                                onClick={() => {
                                  setDeleteModal(!deleteModal);
                                }}
                              >
                                Delete
                              </a>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <TextInput
                              value={editUserEmail}
                              onChange={(e) => setEditUserEmail(e.target.value)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput
                              value={editUserUsername}
                              onChange={(e) =>
                                setEditUserUsername(e.target.value)
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput
                              value={editUserImage}
                              onChange={(e) => setEditUserImage(e.target.value)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput
                              value={editUserRole}
                              onChange={(e) => setEditUserRole(e.target.value)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                          <a
                                className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                                onClick={() => {
                                  try {
                                    axios.patch(`http://localhost:3006/users/${userById.id}`, {
                                        email: editUserEmail,
                                        username: editUserUsername,
                                        image: editUserImage,
                                        role: editUserRole,
                                    })
                                    .then( (res: any) => {
                                        if (res.data) {
                                            toast("Update user successfully", {
                                              position: toast.POSITION.TOP_RIGHT,
                                              type: toast.TYPE.SUCCESS,
                                              className: "toast-message",
                                            });}
                                            setEditModal(!editModal)
                                    })

                                  } catch (error: any) {
                                    console.log(error)
                                  }
                                }}
                              >
                                OK
                              </a>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* delelte modal */}
        <Transition appear show={deleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setDeleteModal(!deleteModal)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 text-center">
                        Are you sure to delete?
                      </p>
                    </div>

                    <div className="mt-6 flex justify-evenly">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          try {
                            axios
                              .delete(
                                `http://localhost:3006/users/${userById.id}`
                              )
                              .then((res) => {
                                console.log(res.data);
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete successfully", {
                                  position: toast.POSITION.TOP_RIGHT,
                                  type: toast.TYPE.SUCCESS,
                                  className: "toast-message",
                                });
                              });
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setDeleteModal(!deleteModal)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={newUserModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setNewUserModal(!newUserModal)}
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      New User
                    </Dialog.Title>

                    <Table hoverable={true}>
                      <Table.Head>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Password</Table.HeadCell>
                        <Table.HeadCell>
                          <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <TextInput
                            value={newUserEmail}
                            required={true}
                            color="info"
                            onChange={(e: any) => {
                              setNewUserEmail(e.target.value);
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <TextInput
                            value={newUsername}
                            required={true}
                            color="info"
                            onChange={(e: any) =>
                              setNewusername(e.target.value)
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <TextInput
                            value={newUserImage}
                            required={true}
                            color="info"
                            onChange={(e: any) =>
                              setNewUserImage(e.target.value)
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <TextInput
                            value={newUserRole}
                            required={true}
                            color="info"
                            onChange={(e: any) =>
                              setNewUserRole(e.target.value)
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <TextInput
                            value={newUserPassword}
                            required={true}
                            color="info"
                            onChange={(e: any) =>
                              setNewuserPassword(e.target.value)
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                            onClick={() => {
                              try {
                                axios
                                  .post(`http://localhost:3006/auth/signup`, {
                                    email: newUserEmail,
                                    username: newUsername,
                                    password: newUserPassword,
                                    image: newUserImage,
                                    role:newUserRole,
                                  })
                                  .then((res: any) => {
                                    setNewUserEmail("");
                                    setNewUserImage("");
                                    setNewUserRole("");
                                    setNewuserPassword("");
                                    setNewusername("");
                                    setNewUserModal(false);
                                
                                    if (res.data?.accessToken) {
                                      toast("Create new user successfully", {
                                        position: toast.POSITION.TOP_RIGHT,
                                        type: toast.TYPE.SUCCESS,
                                        className: "toast-message",
                                      });
                                    }
                                  });
                              } catch (error: any) {
                                console.log(error);
                              }
                            }}
                          >
                            Add
                          </a>
                        </Table.Cell>
                      </Table.Body>
                    </Table>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <>{page}</>
    </Layout>
  );
};

export default Index;
