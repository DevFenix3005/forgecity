import { connect, ConnectedProps } from 'react-redux';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { RootState } from '../../redux/store';
import { selectBackdropState } from '../../redux/info/infoSlice';

const mapStateToProps = (state: RootState) => {
    return {
        showBackdrop: selectBackdropState(state)
    };
}

const connector2MyBackdrop = connect(mapStateToProps);

type MyBackdropPropsFromRedux = ConnectedProps<typeof connector2MyBackdrop>

function MyBackdrop(props: MyBackdropPropsFromRedux) {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.showBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default connector2MyBackdrop(MyBackdrop);