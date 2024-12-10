import Link from 'next/link';
import React from 'react';

export default function InvestigationGroup() {
  return (
    <section className="service-section sec-pad">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Investigación y Desarrollo</span>
          <h2>Grupo de Investigación en Nefrología <br /> Clínica de la Costa</h2>
        </div>
        <div className="row clearfix">
          {/* Grupo de Investigación en Nefrología */}
          <div className="col-lg-12 col-md-12 col-sm-12 service-block">
            <div className="service-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <div className="image-box">
                  {/* <figure className="image">
                    <img
                      src="/mnt/data/imagen.png"
                      alt="Grupo de Investigación en Nefrología"
                      style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                    />
                  </figure> */}
                  <div className="icon-box"><i className="icon-18"></i></div>
                </div>
                <div className="lower-content">
                  <h3>Categoría A1 en Minciencias</h3>
                  <p>El Grupo de Investigación en Nefrología de la Clínica de la Costa está reconocido como un líder en su área, gracias a sus aportes científicos y tecnológicos, logrando la categoría A1 según Minciencias.</p>
                  <p>Comprometidos con la excelencia, el grupo busca desarrollar conocimiento innovador en nefrología para mejorar la calidad de vida de los pacientes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Título de la tabla */}
        <div className="row mt-5">
          <div className="col-12 text-center mb-3">
            <h3 className="font-bold text-gray-800">
              Análisis de Producción Científica: Ventana de Observación (5 Años)
            </h3>
          </div>
        </div>

        {/* Tabla */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">TIPO</th>
                    <th scope="col">CLASE</th>
                    <th scope="col">2019</th>
                    <th scope="col">2020</th>
                    <th scope="col">2021</th>
                    <th scope="col">2022</th>
                    <th scope="col">2023</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="3">Nuevo Conocimiento y Desarrollo Tecnológico</td>
                    <td>Top</td>
                    <td>11</td>
                    <td>16</td>
                    <td>10</td>
                    <td>9</td>
                    <td>5</td>
                    <td>51</td>
                    <td rowSpan="3">143</td>
                  </tr>
                  <tr>
                    <td>Tipo A</td>
                    <td>11</td>
                    <td>16</td>
                    <td>8</td>
                    <td>8</td>
                    <td>4</td>
                    <td>47</td>
                  </tr>
                  <tr>
                    <td>Tipo B</td>
                    <td>7</td>
                    <td>22</td>
                    <td>5</td>
                    <td>5</td>
                    <td>6</td>
                    <td>45</td>
                  </tr>
                  <tr>
                    <td>Apropiación Social del Conocimiento</td>
                    <td>ASC</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Divulgación pública de ciencia</td>
                    <td>DPC</td>
                    <td>15</td>
                    <td>13</td>
                    <td>8</td>
                    <td>13</td>
                    <td>7</td>
                    <td>56</td>
                    <td>56</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">Formación de Recurso Humano</td>
                    <td>FrA</td>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td rowSpan="2">50</td>
                  </tr>
                  <tr>
                    <td>FrB</td>
                    <td>12</td>
                    <td>8</td>
                    <td>8</td>
                    <td>12</td>
                    <td>9</td>
                    <td>49</td>
                  </tr>
                  <tr className="font-weight-bold">
                    <td colSpan="2">Subtotal</td>
                    <td>56</td>
                    <td>76</td>
                    <td>39</td>
                    <td>54</td>
                    <td>26</td>
                    <td>251</td>
                    <td>251</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
