from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend
# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://Julianete:Va3xK!BtQntd)x{E@Julianete.mysql.pythonanywhere-services.com/Julianete$proyecto'
# desde el objeto app configuro la URI de la BBDD    user:clave@localhost/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)
 
# defino la tabla
class Pedidos(db.Model):   # la clase Pedidos hereda de db.Model     
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    precio=db.Column(db.Integer)
    descripcion=db.Column(db.String(100))
    img=db.Column(db.String(10000))
    def __init__(self,nombre,precio,descripcion,img):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.descripcion=descripcion
        self.img=img
with app.app_context():
    db.create_all()  # crea las tablas
#  ************************************************************
class pedidoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','precio','descripcion','img')
pedido_schema=pedidoSchema()            # para crear un pedido
pedidos_schema=pedidoSchema(many=True)  # multiples registros
 
# crea los endpoint o rutas (json)
@app.route('/pedidos',methods=['GET'])
def get_pedidos():
    all_pedidos=Pedidos.query.all()     # query.all() lo hereda de db.Model
    result=pedidos_schema.dump(all_pedidos)  # .dump() lo hereda de ma.schema
    return jsonify(result)
 
@app.route('/pedidos/<id>',methods=['GET'])
def get_pedido(id):
    pedido=Pedidos.query.get(id)
    return pedido_schema.jsonify(pedido)

@app.route('/pedidos/<id>',methods=['DELETE'])
def delete_pedido(id):
    pedido=Pedidos.query.get(id)
    db.session.delete(pedido)
    db.session.commit()
    return pedido_schema.jsonify(pedido)

@app.route('/pedidos', methods=['POST']) # crea ruta o endpoint
def create_pedido():
    print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    precio=request.json['precio']
    descripcion=request.json['descripcion']
    img=request.json['img']
    new_pedido=Pedidos(nombre,precio,descripcion,img)
    db.session.add(new_pedido)
    db.session.commit()
    return pedido_schema.jsonify(new_pedido)

@app.route('/pedidos/<id>' ,methods=['PUT'])
def update_pedido(id):
    pedido=Pedidos.query.get(id)
   
    nombre=request.json['nombre']
    precio=request.json['precio']
    descripcion=request.json['descripcion']
    img=request.json['img']
 
    pedido.nombre=nombre
    pedido.precio=precio
    pedido.descripcion=descripcion
    pedido.img=img
    db.session.commit()
    return pedido_schema.jsonify(pedido)

# programa principal *******************************
if __name__=='__main__':  
    app.run(port=3306)  