package trees.domain.dto.link;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class RootCreationDTO {
    private Long trunkId;
    private Long rootId;
    private Double rootQt;
    private Double trunkQt;
    private String displayUnit;
}
