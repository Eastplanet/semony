package com.semony.maker.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "eqp_inspection_hst_alpha")
public class EqpInspectionHstAlpha {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_eqp_inspection_hst_alpha")
    @SequenceGenerator(name = "seq_eqp_inspection_hst_alpha", sequenceName = "public.seq_eqp_inspection_hst_alpha", allocationSize = 1)
    private Long rawId;

    @Column(name = "event_dtts", nullable = false)
    private LocalDateTime eventDtts;

    @Column(name = "module_id", nullable = false, length = 32)
    private String moduleId;

    @Column(name = "lot_id", length = 32)
    private String lotId;

    @Column(name = "lot_seq", precision = 20, scale = 0)
    private BigDecimal lotSeq;

    @Column(name = "slot_no", length = 5)
    private String slotNo;

    @Column(name = "flow_recipe", length = 256)
    private String flowRecipe;

    @Column(name = "process_recipe", length = 32)
    private String processRecipe;

    @Column(name = "port_no", length = 5)
    private String portNo;

    @Column(name = "defect_count")
    private Long defectCount;

    @Column(name = "create_dtts")
    private LocalDateTime createDtts;

    @Builder
    private EqpInspectionHstAlpha(LocalDateTime eventDtts, String moduleId, String lotId,
        BigDecimal lotSeq, String slotNo, String flowRecipe,
        String processRecipe, String portNo, Long defectCount,
        LocalDateTime createDtts) {
        this.eventDtts = eventDtts;
        this.moduleId = moduleId;
        this.lotId = lotId;
        this.lotSeq = lotSeq;
        this.slotNo = slotNo;
        this.flowRecipe = flowRecipe;
        this.processRecipe = processRecipe;
        this.portNo = portNo;
        this.defectCount = defectCount;
        this.createDtts = createDtts;
    }
}
