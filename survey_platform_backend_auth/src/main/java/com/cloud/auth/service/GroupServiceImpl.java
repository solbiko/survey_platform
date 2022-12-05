package com.cloud.auth.service;

import com.cloud.auth.dto.GroupDTO;
import com.cloud.auth.dto.PageRequestDTO;
import com.cloud.auth.dto.PageResultDTO;
import com.cloud.auth.entity.Group;
import com.cloud.auth.entity.User;
import com.cloud.auth.repository.GroupRepository;
import com.cloud.auth.repository.UserGroupRepository;
import com.cloud.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    private final UserGroupRepository userGroupRepository;

    private final UserRepository userRepository;


    // 그룹 리스트 조회
    @Override
    public PageResultDTO<GroupDTO, Group> getGroupList(String userId, PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("groupId").descending());
        Page<Group> groupListPage = groupRepository.findExistGroup(pageable);

        Function<Group, GroupDTO> fn = ((group)->{
            List<User> prtcpList = userGroupRepository.userList(group.getGroupId());
            AtomicReference<String> participatedFlag = new AtomicReference<>("N"); // 참여 여부
            if(prtcpList.size() > 0 ) {
                prtcpList.forEach((prtcp) -> {
                    if (prtcp.getUserId().equals(userId)) {
                        participatedFlag.set("Y");
                    }
                });
            }

            String isParticipated = participatedFlag.get();
            String isCreated = userId == group.getUser().getUserId() ? "Y": "N";

            return entityToDTO(group, prtcpList, isParticipated, isCreated);
        });

        return new PageResultDTO<>(groupListPage, fn);
    }

    // 그룹 삭제
    @Override
    public Integer deleteGroup(Integer groupId) {
        // 값이 없으면 delete, return 1
        if(userGroupRepository.userList(groupId).isEmpty()) {
            groupRepository.updateGroupDelY(groupId);
            return 1;
        }
        // 값이 있으면 return 0
        else {
            return 0;
        }
    }

    // 그룹 생성
    @Override
    public void insertGroup(GroupDTO groupDTO) {
        User user = userRepository.findByUserId(groupDTO.getRegId());
        Group group = dtoToEntity(groupDTO, user);
        groupRepository.save(group);
    }


    // 그룹 상세 조회
    @Override
    public GroupDTO getOneGroupDetail(Integer groupId) {
        Group group = groupRepository.findByGroupId(groupId);
        List<User> userList = userGroupRepository.userList(groupId);
        String isParticipated = null;
        String isCreated = null;
        GroupDTO groupDTO = entityToDTO(group, userList, isParticipated, isCreated);
        return groupDTO;
    }
}
