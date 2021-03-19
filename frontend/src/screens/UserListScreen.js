import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listUsers, deleteUser, createUser } from '../actions/userActions';
import { USER_CREATE_RESET } from '../constants/userConstants';

const UserListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users, page, pages } = userList;

  // const userDelete = useSelector(state => state.userDelete);
  // const { success: successDelete } = userDelete;

  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = userDelete;

  // const userCreate = useSelector(state => state.userCreate);
  // const { success: successCreate } = userCreate;

  const userCreate = useSelector(state => state.userCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    user: createdUser
  } = userCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch({ type: USER_CREATE_RESET });
    // if (userInfo && userInfo.isAdmin) {
    //   dispatch(listUsers());
    // } else {
    //   history.push('/login');
    // }

    dispatch({ type: USER_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      //history.push(`/admin/users/createuser/${createdUser._id}/edit`);
      history.push(`/admin/user/${createdUser._id}/edit`);
    } else {
      dispatch(listUsers(pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdUser,
    pageNumber
  ]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  const createUserHandler = () => {
    dispatch(createUser());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createUserHandler}>
            <i className='fas fa-plus'></i> Create User
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    {userInfo && user.isAdmin ? (
                      <Button
                        disabled
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    ) : (
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default UserListScreen;
