import Link from 'next/link';

import TicketImage from '../../../assets/images/ticket.png'

const TicketCard = (props) =>
    (
        <div style={{
            borderRadius: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                position: 'relative',
                width: '70%',
            }}>
                <Link href={`myTicket?id=${props.id}`}><a>
                    <img src={TicketImage} style={{
                        position: 'absolute',
                        width: '100%',
                        top: 0, left: 0
                    }} />
                    <div style={{
                        position: 'absolute',
                        zIndex: 5,
                        textAlign: 'center',
                        width: '100%'
                    }}>
                        <h2 style={{ color: '#06567b' }}>Consulte seu ticket, uma copia foi para seu email.</h2>
                    </div>
                </a></Link>
            </div>
        </div>
    );


export default TicketCard;