package trees.domain.dto.tree;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class TrunkCreationDTO {

    private Double qt;
    private String displayUnit;
    private String name;

}
