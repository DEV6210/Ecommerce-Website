import Navbarall from "./NavbarAll";
import './css/about.scss'
import React from 'react';

console.clear();

const messages = [
    {
        author: 'loading',
        body: '...',
        timeout: 0
    },
    {
        author: 'bot',
        body: 'Hello',
        timeout: 800
    },
    {
        author: 'bot',
        body: "Hello, i'm your Assistant how can i help you?",
        timeout: 1500
    },
    {
        author: 'bot',
        body: 'we are try to fast delivery',
        timeout: 3000
    },
    {
        author: 'bot',
        body: 'track your order?',
        timeout: 4000
    },
    {
        author: 'bot',
        body: [
            {
                url: '/login',
                text: 'Profile'
            },
            {
                url: '/cart',
                text: 'wishlist'
            },
            {
                url: '/',
                text: 'dashboard'
            }
        ],
        timeout: 5000
    }
];

const responses = [
    'how can i help you?',
    'our team allways try to provide best service , please dont warry..🫡',
    [
        'Enter Your order id'
    ],
    [
        'sorry sir, we can unable to provide this information. I think you enter wronk order id',
        'Please contact our team, They are help you. contac: 9382370394'
    ],
    'I\'m out, good bye.'
];

const Message = props => {
    const { id, author, body } = props.data;

    let finalBody;

    if (Array.isArray(body)) {
        finalBody = body.map((item, index) => {
            return <a href={item.url} className="c-chat__action" key={index}>{item.text}</a>;
        });
    }
    else {
        finalBody = <div className="c-chat__message">{body}</div>;
    }

    return (
        <li className={"c-chat__item c-chat__item--" + author}>
            {finalBody}
        </li>
    );
};

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            responses: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.demo = this.demo.bind(this);
        this.mockReply = this.mockReply.bind(this);
    }

    componentDidMount() {
        this.demo();
    }

    demo() {

        this.setState({
            messages: [],
            responses: 0
        });

        messages.map((item, index) => {
            setTimeout(() => this.addMessage(item), item.timeout);
        });

        // window.addEventListener('keydown', (e) => {
        //     // if d for demo
        //     if (e.keyCode === "68") {
        //         this.demo();
        //     }
        // });

        setTimeout(() => {
            this.setState({
                messages: this.state.messages.slice(1, this.state.messages.length)
            });
        }, 700);

    }

    addMessage(item) {
        this.setState({
            messages: [...this.state.messages, item]
        });

        setTimeout(() => {
            const items = document.querySelectorAll('li');
            const lastItem = items[items.length - 1];
            document.querySelector('.c-chat__list').scrollTop = lastItem.offsetTop + lastItem.style.height;
        }, 100);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.addMessage({
            author: 'human',
            body: e.target.querySelector('input').value
        });

        this.mockReply();

        e.target.reset();

    }

    mockReply() {
        let response;

        if (this.state.responses === 0) {
            response = responses[this.state.responses];
        }
        else {
            if (responses[this.state.responses]) response = responses[this.state.responses];
        }

        if (response) {
            this.setState({
                responses: this.state.responses + 1
            });

            if (Array.isArray(response)) {
                response.map((item, index) => {
                    setTimeout(() => this.addMessage({ author: 'bot', body: item }), 600 + (500 * index));
                });
            }
            else {
                setTimeout(() => this.addMessage({ author: 'bot', body: response }), 600);
            }
        }
    }

    render() {

        let cssClass = ['c-chat'];

        if (this.state.messages.length > 4) {
            cssClass.push('c-chat--ready');
        }

        if (this.state.messages.length === 5) {
            document.querySelector('input').focus();
        }

        return (
            <div className={cssClass.join(' ')}>
                <ul className="c-chat__list">
                    {this.state.messages.map((message, index) => <Message key={index} data={message} />)}
                </ul>
                <form className="c-chat__form chat" onSubmit={this.handleSubmit}>
                    <input type="text" name="input" placeholder="Type your message here..." autoFocus autoComplete="off" required />
                </form>
            </div>
        );
    }
}

const About = () => {
    return (
        <>

            <Navbarall link='/' navtitle='Contact US' />
            <div>
                <div class="b-chat">
                    <div class="b-chat__container">
                        <Chat />
                    </div>
                </div>
            </div>


            {/* <BottomNav cssvalue='buttontap-2' /> */}



        </>
    )
}
export default About;