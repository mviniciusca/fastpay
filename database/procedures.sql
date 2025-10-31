USE fastpay;

DROP PROCEDURE IF EXISTS calcular_saldo_listar_transacoes;

DELIMITER $$

CREATE PROCEDURE calcular_saldo_listar_transacoes(
    IN conta_id INT,
    IN periodo_inicio DATE,
    IN periodo_fim DATE
)
BEGIN
    DECLARE saldo_calculado DECIMAL(10,2);
    
    SELECT 
        COALESCE(SUM(CASE WHEN tipo = 'CREDITO' THEN valor ELSE -valor END), 0)
    INTO saldo_calculado
    FROM transacoes
    WHERE transacoes.conta_id = conta_id
    AND (periodo_inicio IS NULL OR DATE(data_transacao) >= periodo_inicio)
    AND (periodo_fim IS NULL OR DATE(data_transacao) <= periodo_fim);
    
    SELECT saldo_calculado AS saldo;
    
    SELECT 
        id,
        tipo,
        valor,
        descricao,
        data_transacao
    FROM transacoes
    WHERE transacoes.conta_id = conta_id
    AND (periodo_inicio IS NULL OR DATE(data_transacao) >= periodo_inicio)
    AND (periodo_fim IS NULL OR DATE(data_transacao) <= periodo_fim)
    ORDER BY data_transacao DESC
    LIMIT 10;
    
END$$

DELIMITER ;

/*
STORED PROCEDURES
Procedimentos armazenados para automação de consultas
Marcos V C Augusto

PROCEDURE: calcular_saldo_listar_transacoes

Descrição:
  • Calcula o saldo de uma conta
  • Lista as 10 últimas transações
  • Permite filtro por período

Parâmetros:
  @conta_id       - ID da conta a ser consultada
  @periodo_inicio - Data inicial do período (NULL = sem filtro)
  @periodo_fim    - Data final do período (NULL = sem filtro)

Retorna:
  Result Set 1: Saldo calculado da conta
  Result Set 2: 10 últimas transações do período

Exemplos de uso:
  CALL calcular_saldo_listar_transacoes(1, NULL, NULL);
  CALL calcular_saldo_listar_transacoes(1, '2025-01-01', '2025-10-31');
  CALL calcular_saldo_listar_transacoes(1, '2025-10-01', NULL);
  CALL calcular_saldo_listar_transacoes(1, NULL, '2025-06-30');
*/
