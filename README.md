# Smart3 - Learn, Build, and Grow in Web3 with AI-powered Hands-on Labs.

![logo](./logo.png)

## Introdução
Smart3 is an AI-powered platform that combines interactive learning and hands-on practice to empower professionals in the Web3 ecosystem. Through gamified tracks, quizzes, and sandbox labs, users learn about blockchain, DAOs, and DeFi while gaining real-world experience.  

Additionally, Smart3 connects skilled talent with market opportunities, aligning acquired knowledge with real demands from Web3 startups and companies. Our mission is to accelerate careers and drive Web3 adoption through practical and accessible education.

## Features  
- **Interactive and hands-on learning** – Gamified educational tracks on Web3 and AI.  
- **Sandbox labs** – Experiment with smart contracts, DAOs, and DeFi in a secure environment.  
- **Quizzes and challenges** – Validate knowledge through gamification mechanics.  
- **Market connection** – Talent pool and job opportunities for Web3 professionals.

## Instalação 
### Back-end e Blockchain
1. Pré-requisitos:
- Possuir o Docker e WSL2/uma distribuição linux instalados em seu computador

2. Instale o Rust
- ```curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh```

3. Instale uma IDE (recomendamos utilizar o VSCode, o qual pode ser instalado no link abaixo)
- https://code.visualstudio.com/

4. Instale o Foundry
- ```curl -L https://foundry.paradigm.xyz | bash```

5. Instale e ative o Nitro devnode
- ```git clone https://github.com/OffchainLabs/nitro-devnode.git```
- ```cd nitro-devnode```
- ```./run-dev-node.sh```

6. Instale o cargo stylus
- ```cargo install --force cargo-stylus```

7. Adicione o WASM
- ```rustup default 1.80```
- ```rustup target add wasm32-unknown-unknown --toolchain 1.80```

### Front-end

1. Instale as dependências necessárias
- ```npm install```

2. Rode a aplicação web
- ```npm start```

## Estrutura de pastas

```
HACKATHON-BH
├── certificado-nft
│   └── ...
├── client
│   └── ...
├── scroll
|   └── ...
├── token-smd
|   └── ...
├── README.MD
│   
```

- certificado-nft
    - Pasta com o projeto certificado como nft emitido na Arbitrum com Arbitrum Stylus
- client
    - Pasta com projeto React
- scroll
    - Pasta com NFTs emitidos na Scroll
- token-smd
    - Pasta com o projeto token simulador (SMD) como erc-20 emitido na Arbitrum com Arbitrum Stylus

## Tech Stacks

### Backend & Blockchain

#### Blockchains
- Scroll
- Arbitrum

#### Pacotes externos
- rustup
- rustc
- cargo

### Front-end

#### Pacotes externos
- React

## Roadmap
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus, eros quis venenatis euismod, nisi nisl maximus tellus, a molestie purus nulla vitae quam. Mauris vestibulum eu justo ut feugiat. Cras faucibus lacus ut dui venenatis, commodo vulputate elit sodales. Sed congue dui et nisl bibendum ultrices. Cras vel mi in nunc mollis placerat a ac neque. Fusce in tempor enim, vitae dictum massa. In porta metus sed nisl dictum, id tincidunt mauris hendrerit. Cras accumsan enim non quam pellentesque viverra. Sed sit amet augue sagittis, consequat leo sed, lobortis mi. Cras semper vestibulum erat ac laoreet. Duis risus ante, consectetur at mi a, mattis tempus velit. Nam sit amet egestas velit, egestas varius ante. Sed ut rutrum tortor, vel commodo augue.

## Special Thanks
A special thanks to the organizing team of the ICP AI Agents Hackathon and to the ICP EU Alliance for this incredible opportunity. We are excited to contribute to the Internet Computer Protocol ecosystem and push the boundaries of AI and Web3 innovation. 