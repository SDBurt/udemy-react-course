import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req;
        });

        const responseInterceptor = axios.interceptors.response.use(
            res => res,
            err => {
                setError(err);
                return Promise.reject(err);
            }
        );

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor)
                axios.interceptors.response.eject(responseInterceptor)
            };
        }, [responseInterceptor, requestInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <React.Fragment>
                <Modal
                    showModal={error !== null}
                    hideModal={errorConfirmedHandler}
                >
                    {error !== null ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />

            </React.Fragment>
        );
    };
};

export default withErrorHandler