export type Product = {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tallas?: string;
  categoria_nombre?: string;
};

export type CartItem = Product & {
  tallaSeleccionada: string;
};