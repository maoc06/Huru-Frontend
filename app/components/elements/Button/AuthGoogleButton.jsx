import GoogleLogin from 'react-google-login';

import Button from './Button';
import GoogleIcon from '../Icons/SocialMedia/GoogleIcon';

export default function AuthGoogleButton({
  text,
  onSuccess,
  onFailure,
  ...otherProps
}) {
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          invert={true}
          icon={<GoogleIcon width={21} height={21} />}
          withIcon={true}
          tinyBorder={true}
          {...otherProps}
        >
          {text}
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}
