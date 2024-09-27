import CounterUp from "@/components/elements/CounterUp";

export default function Funfacts() {
    return (
        <>        
            <section className="funfact-section centred">
                <div className="auto-container">
                    <div className="inner-container">
                        <div className="row clearfix">
                            {/* Funfact 1: Médicos Especialistas */} 
                            <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box" style={{ minHeight: '150px' }}>
                                        <div className="count-outer count-box">
                                            <CounterUp end={75} /><span>+</span>
                                        </div>
                                        <span className="text">Médicos Especialistas</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Funfact 2: Pacientes Felices */} 
                            <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box" style={{ minHeight: '150px' }}>
                                        <div className="count-outer count-box">
                                            <CounterUp end={100000} /><span>+</span>
                                        </div>
                                        <span className="text">Pacientes Felices</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Funfact 3: Habitaciones Modernas */} 
                            <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box" style={{ minHeight: '150px' }}>
                                        <div className="count-outer count-box">
                                            <CounterUp end={300} /><span>+</span>
                                        </div>
                                        <span className="text">Habitaciones Modernas</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Funfact 4: Premios Ganados */} 
                            <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box" style={{ minHeight: '150px' }}>
                                        <div className="count-outer count-box">
                                            <CounterUp end={10} />
                                        </div>
                                        <span className="text">Premios Ganados</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
