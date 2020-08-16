import server from '../server';
import chaiHttp from 'chai-http';
import chai from 'chai';
const should = chai.should();

chai.use(chaiHttp);

describe('Запросы', function () {
  this.timeout(60000);
  describe('/GET friends', () => {
    it('1. Валидный запрос', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 191551772, id2: 371338739 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(3);
          res.body.should.have.property('friends').lengthOf(9);
          done();
        });
    });

    it('2. Пустой запрос', (done) => {
      chai
        .request(server())
        .post('/friends')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('3. Неполный запрос', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 191551772 })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('4. Запрос с другими полями', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 191551772, id3: 234234 })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('5. Запрос числом и строкой', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 'https://vk.com/a1ext0', id2: 371338739 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(3);
          res.body.should.have.property('friends').lengthOf(9);
          done();
        });
    });

    it('5. Запрос двумя строками', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 'https://vk.com/a1ext0', id2: 'vk.com/id371338739' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(3);
          res.body.should.have.property('friends').lengthOf(9);
          done();
        });
    });

    it('6. Запрос c неверной ссылкой строками', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 'https://vk.com/a1ext00000', id2: 'vk.com/id371338739' })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('7. Запрос c неверным id ссылкой числами', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 191551772, id2: 19155567857658671772 })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(0);
          done();
        });
    });

    it('8. Запрос c одинаковыми id ссылкой и числом', (done) => {
      chai
        .request(server())
        .post('/friends')
        .send({ id1: 191551772, id2: 'vk.com/a1ext0' })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('/GET info', () => {
    it('1. Валидный запрос', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id: 191551772 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(1);
          res.body.info.should.have.property('id').eql(191551772);
          done();
        });
    });

    it('2. Пустой запрос', (done) => {
      chai
        .request(server())
        .post('/info')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('3. Неверный запрос', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id1: 191551772 })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('4. Запрос с несколькими полями', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id1: 191551772, id3: 234234 })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('5. Запрос строкой', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id: 'https://vk.com/a1ext0' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(1);
          res.body.info.should.have.property('id').eql(191551772);
          done();
        });
    });

    it('6. Запрос строкой-числом', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id: 'vk.com/id371338739' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(1);
          res.body.info.should.have.property('id').eql(371338739);
          done();
        });
    });

    it('7. Запрос c неверной ссылкой строками', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id: 'https://vk.com/a1ext00000' })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('8. Запрос c неверным id ссылкой числами', (done) => {
      chai
        .request(server())
        .post('/info')
        .send({ id: 19155567857658671772 })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });
});
