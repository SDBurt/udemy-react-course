
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err })
            })
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        showModal={this.state.error !== null}
                        hideModal={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />

                </React.Fragment>
            );
        };
    };
};

export default withErrorHandler

// import React, { useState, useEffect } from 'react';
// import Modal from '../../components/UI/Modal/Modal'

// const withErrorHandler = (WrappedComponent, axios) => {

//     return props => {

//         const [error, setError] = useState(null);

//         const reqInterceptor = axios.interceptors.request.use(req => {
//             setError(null)
//             return req;
//         })

//         const resInterceptor = axios.interceptors.response.use(res => res, err => {
//             setError(err)
//         })

//         useEffect(() => {
//             return () => {
//                 axios.interceptors.response.eject(resInterceptor)
//             };
//         }, [resInterceptor]);

//         useEffect(() => {
//             return () => {
//                 axios.interceptors.request.eject(reqInterceptor)
//             };
//         }, [reqInterceptor]);

//         const errorConfirmedHandler = () => {
//             setError(null)
//         }

//         return (
//             <React.Fragment>
//                 <Modal
//                     showModal={error !== null}
//                     hideModal={errorConfirmedHandler}
//                 >
//                     {error ? error.message : null}
//                 </Modal>
//                 <WrappedComponent {...props} />

//             </React.Fragment>
//         );
//     };
// };

// export default withErrorHandler
