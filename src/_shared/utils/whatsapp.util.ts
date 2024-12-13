import { IQuoteItem } from "../interface/quote.interface";

export class WhatsAppUtil {
  public static readonly contacts = {
    service: "5511941523131",
  };

  public static buildLink(phone: string, message: string) {
    return `http://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  }

  public static generateQuoteAnswer(data: IQuoteItem): string {
    const { customer, products, observation, creationDate } = data;
    const formattedDate = new Date(creationDate).toLocaleDateString("pt-BR");

    const productList = products.map((p) => `• ${p.title}`).join("\n");

    const message = `Olá ${customer.name},

Espero que esteja bem! Sou da equipe de vendas e estou entrando em contato referente à sua solicitação de cotação realizada em ${formattedDate} para o(s) seguinte(s) produto(s):

${productList}

Gostaríamos de agradecer seu interesse em nossos produtos e estamos à disposição para fornecer todas as informações necessárias e esclarecer quaisquer dúvidas que possa ter. 

Observação adicional da sua solicitação: "${observation}" 

Poderia me informar qual seria o melhor momento para discutirmos mais detalhes sobre sua necessidade?

Aguardo seu retorno e fico à disposição para ajudar!

Atenciosamente,
Supicom`;

    return encodeURIComponent(message);
  }
}
