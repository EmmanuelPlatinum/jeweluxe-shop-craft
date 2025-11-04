import { Navbar } from "@/components/Navbar";

const Sobre = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sobre a Jeweluxe</h1>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Bem-vindo à <span className="font-semibold text-foreground">Jeweluxe</span>, onde a elegância 
              encontra a sofisticação em cada peça cuidadosamente selecionada.
            </p>

            <p>
              Nossa missão é oferecer joias de luxo excepcionais para homens e mulheres que apreciam 
              o valor do artesanato refinado e do design atemporal. Cada peça em nossa coleção é 
              escolhida por sua qualidade superior, beleza única e capacidade de complementar 
              qualquer estilo.
            </p>

            <div className="my-8 p-6 bg-muted rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Nossos Valores</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✦</span>
                  <span><strong className="text-foreground">Qualidade Premium:</strong> Apenas as melhores peças fazem parte de nossa coleção</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✦</span>
                  <span><strong className="text-foreground">Design Exclusivo:</strong> Joias que combinam tradição e modernidade</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✦</span>
                  <span><strong className="text-foreground">Atendimento Excepcional:</strong> Sua satisfação é nossa prioridade</span>
                </li>
              </ul>
            </div>

            <p>
              Com anos de experiência no mercado de joias de luxo, construímos uma reputação 
              baseada em confiança, autenticidade e excelência. Cada cliente é único, e nos 
              dedicamos a ajudá-lo a encontrar a peça perfeita que expressa sua individualidade.
            </p>

            <p className="font-semibold text-foreground">
              Descubra o luxo que você merece. Descubra Jeweluxe.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sobre;
