import secret from './secret';

let host: string;
let port: number;

let env = process.env.NODE_ENV;

//Установка хоста и порта на дев и прод
if (env == 'production') {
  host = 'localhost';
  port = 7878;
} else {
  host = '0.0.0.0';
  port = 7777;
}

class Credentials {
  HOST = host;
  PORT = port;
  vk = {
    username: secret.vkUsername,
    password: secret.vkPassword,
  };
}

export = new Credentials();
