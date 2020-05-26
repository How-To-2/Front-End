import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../includes/colors';

const Link = styled(RouterLink)`
    font-family: routed-gothic;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    color: ${props => props.active ? COLORS.YELLOW : COLORS.WHITE};
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }
`;

export default Link;