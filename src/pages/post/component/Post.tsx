import "./Post.css";

export const Post = ({key, titulo, foto, conteudo, usuario_cadastrador, usuario_atualizador, data_criacao, data_atualizacao}) => {
  return (
    <div className='post'>
      <div className='cabecalho'>
        <img src={foto.url} alt='nome'></img>
      </div>    
      <div className='rodape'>
        <h4>{titulo}</h4>
        <h5>{conteudo}</h5>
        <h5>{usuario_cadastrador}</h5>
        <h5>{usuario_atualizador}</h5>
        <h5>{data_criacao}</h5>
        <h5>{data_atualizacao}</h5>
      </div>
    </div>
  );
};
