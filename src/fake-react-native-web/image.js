/**
 * A copy of react-native-web's <Image/> component, but with some minor
 * changes:
 *  (1) No support for specifying resizeMode in the passed-in style.
 *  (2) No support for custom accessibility labels.
 *  (3) Style fixes to pass our own lint checks.
 */

const React = require('react');
const { StyleSheet, css } = require('aphrodite');
const View = require('./view');

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

// https://github.com/necolas/react-native-web/blob/master/src/components/Image/resolveAssetSource.js
const resolveAssetSource = (source) => {
    return ((typeof source === 'object') ? source.uri : source) || null;
};

// https://github.com/necolas/react-native-web/blob/master/src/components/Image/ImageResizeMode.js
const ImageResizeMode = {
    contain: 'contain',
    cover: 'cover',
    none: 'none',
    stretch: 'stretch',
};

const ImageSourcePropType = React.PropTypes.oneOfType([
    React.PropTypes.shape({
        uri: React.PropTypes.string.isRequired,
    }),
    React.PropTypes.string,
]);

const Image = React.createClass({
    propTypes: {
        children: React.PropTypes.any,
        defaultSource: ImageSourcePropType,
        onError: React.PropTypes.func,
        onLoad: React.PropTypes.func,
        onLoadEnd: React.PropTypes.func,
        onLoadStart: React.PropTypes.func,
        resizeMode: React.PropTypes.oneOf([
            'contain', 'cover', 'none', 'stretch',
        ]),
        source: ImageSourcePropType,
        style: React.PropTypes.any,
    },

    getInitialState() {
        const uri = resolveAssetSource(this.props.source);
        return {
            status: uri ? STATUS_PENDING : STATUS_IDLE,
        };
    },

    componentDidMount() {
        if (this.state.status === STATUS_PENDING) {
            this._createImageLoader();
        }
    },

    componentWillReceiveProps(nextProps) {
        const nextUri = resolveAssetSource(nextProps.source);
        if (resolveAssetSource(this.props.source) !== nextUri) {
            this.setState({
                status: nextUri ? STATUS_PENDING : STATUS_IDLE,
            });
        }
    },

    componentDidUpdate() {
        if (this.state.status === STATUS_PENDING && !this.image) {
            this._createImageLoader();
        }
    },

    componentWillUnmount() {
        this._destroyImageLoader();
    },

    _createImageLoader() {
        const uri = resolveAssetSource(this.props.source);

        this._destroyImageLoader();
        this.image = new window.Image();
        this.image.onerror = this._onError;
        this.image.onload = this._onLoad;
        this.image.src = uri;
        this._onLoadStart();
    },

    _destroyImageLoader() {
        if (this.image) {
            this.image.onerror = null;
            this.image.onload = null;
            this.image = null;
        }
    },

    _onError(e) {
        const { onError } = this.props;
        const event = { nativeEvent: e };

        this._destroyImageLoader();
        this.setState({ status: STATUS_ERRORED });
        this._onLoadEnd();
        if (onError) {
            onError(event);
        }
    },

    _onLoad(e) {
        const { onLoad } = this.props;
        const event = { nativeEvent: e };

        this._destroyImageLoader();
        this.setState({ status: STATUS_LOADED });
        if (onLoad) {
            onLoad(event);
        }
        this._onLoadEnd();
    },

    _onLoadEnd() {
        const { onLoadEnd } = this.props;
        if (onLoadEnd) {
            onLoadEnd();
        }
    },

    _onLoadStart() {
        const { onLoadStart } = this.props;
        this.setState({ status: STATUS_LOADING });
        if (onLoadStart) {
            onLoadStart();
        }
    },

    render() {
        const {
            children,
            defaultSource,
            source,
            style,
        } = this.props;

        const isLoaded = this.state.status === STATUS_LOADED;
        const displayImage = resolveAssetSource(
            !isLoaded ? defaultSource : source
        );
        const backgroundImage = displayImage ? `url("${displayImage}")` : null;
        const resizeMode = this.props.resizeMode || ImageResizeMode.cover;

        const extraStyles = StyleSheet.create({
            showBackgroundImage: {
                backgroundImage,
            },
        });

        return <View
            accessibilityRole='img'
            style={[
                styles.initial,
                extraStyles.showBackgroundImage,
                ...(Array.isArray(style) ? style : [style]),
                resizeModeStyles[resizeMode],
            ]}
        >
            <img src={displayImage} className={css(styles.img)} />
            {children ?
                <View
                    children={children}
                    pointerEvents='box-none'
                    style={styles.children}
                /> : null}
        </View>;
    },
});

// https://github.com/necolas/react-native-web/blob/master/src/components/Image/index.js
const styles = StyleSheet.create({
    initial: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    img: {
        borderWidth: 0,
        height: 'auto',
        maxHeight: '100%',
        maxWidth: '100%',
        opacity: 0,
    },
    children: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

const resizeModeStyles = StyleSheet.create({
    contain: {
        backgroundSize: 'contain',
    },
    cover: {
        backgroundSize: 'cover',
    },
    none: {
        backgroundSize: 'auto',
    },
    stretch: {
        backgroundSize: '100% 100%',
    },
});

module.exports = Image;
