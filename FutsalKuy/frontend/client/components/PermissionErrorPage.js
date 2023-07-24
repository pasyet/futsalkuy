import { Heading, HStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PermissionErrorPage = () => {
    return (
        <HStack flex="1" justifyContent="center" alignItems="center" space="3">
            <Ionicons name="alert-circle" size={30} />
            <Heading color="error.400" fontSize="md">
                Missing permission
            </Heading>
        </HStack>
    );
};

export default PermissionErrorPage;